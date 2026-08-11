import type { Project } from '~~/github';

type GithubReposoryResponse = {
  data: {
    user: {
      pinnedItems: {
        nodes: Array<{
          description: string | null;
          homepageUrl: string | null;
          languages: { nodes: Array<{ color: string; name: string }> };
          name: string;
          url: string | null;
          stargazerCount: number;
        }>;
      };
    };
  };
};

export default defineEventHandler(
  async (event): Promise<Project[]> => {
    const config = useRuntimeConfig(event);

    if (!config.githubApiKey) {
      return [];
    }

    const response = await $fetch<GithubReposoryResponse>(
      'https://api.github.com/graphql',
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${config.githubApiKey}`,
          'user-agent': 'TejalReddy +http://tejal.tech',
        },
        body: {
          query: `
            query GET_PROJECTS {
              user(login: "53n90ku") {
                pinnedItems(first: 6) {
                  nodes {
                    ... on Repository {
                      name
                      languages(
                        first: 3
                        orderBy: { field: SIZE, direction: DESC }
                      ) {
                        nodes {
                          color
                          name
                        }
                      }
                      description
                      homepageUrl
                      url
                    }
                  }
                }
              }
            }
          `,
        },
      },
    );

    const projects = (response?.data?.user?.pinnedItems?.nodes ?? []).map(
      (p) => ({
        ...p,
        languages: p?.languages?.nodes ?? [],
        description: p?.description ?? '',
        homepageUrl: p?.homepageUrl ?? '',
        url: p?.url ?? '',
        stargazerCount: p?.stargazerCount ?? 0,
      }),
    );

    setResponseHeader(event, 'x-redis-cache', 'miss');

    return projects;
  }
);
