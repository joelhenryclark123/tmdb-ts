import { BaseEndpoint } from './base';
import querystring from 'querystring';
import { CertificationEndpoint } from './certification';

export enum DiscoverSortOption {
  popularityAsc = 'popularity.asc',
  popularityDesc = 'popularity.desc',
  releaseDateAsc = 'release_date.asc',
  releaseDateDesc = 'release_date.desc',
  revenueAsc = 'revenue.asc',
  revenueDesc = 'revenue.desc',
  primaryReleaseDateAsc = 'primary_release_date.asc',
  primaryReleaseDateDesc = 'primary_release_date.desc',
  originalTitleAsc = 'original_title.asc',
  originalTitleDesc = 'original_title.desc',
  voteAverageAsc = 'vote_average.asc',
  voteAverageDesc = 'vote_average.desc',
  voteCountAsc = 'vote_count.asc',
  voteCountDesc = 'vote_count.desc',
}

export interface DiscoverRequest {
  language?: string;
  region?: string;
  sort_by?: DiscoverSortOption;
  page?: number;
  with_watch_providers?: string[];
  watch_region?: string;
  with_watch_monetization_types?: string[];
}

export interface MoviesDiscoverResponse {
  results: string;
}

export class DiscoverEndpoint extends BaseEndpoint {
  constructor(protected readonly accessToken: string) {
    super(accessToken);
  }

  async movies({
    language,
    region,
    sort_by,
    page,
    watch_region,
    with_watch_providers,
    with_watch_monetization_types,
  }: DiscoverRequest): Promise<MoviesDiscoverResponse> {
    const params = querystring.encode({ language, region, sort_by: sort_by?.valueOf(), page, watch_region, with_watch_providers: with_watch_providers?.join('|'), with_watch_monetization_types });
    return await this.api.get<MoviesDiscoverResponse>(
      `/discover/movie?${params}`,
    );
  }
}
