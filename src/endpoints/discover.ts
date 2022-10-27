import { BaseEndpoint } from './base';
import querystring from 'querystring';
import { Movie, Search } from '../types';

export interface DiscoverRequest {
  language?: string;
  region?: string;
  sort_by?: 'popularity.asc' |
  'popularity.desc' |
  'release_date.asc' |
  'release_date.desc' |
  'revenue.asc' |
  'revenue.desc' |
  'primary_release_date.asc' |
  'primary_release_date.desc' |
  'original_title.asc' |
  'original_title.desc' |
  'vote_average.asc' |
  'vote_average.desc' |
  'vote_count.asc' |
  'vote_count.desc';
  page?: number;
  providerIds: string[] | string;
  watch_region?: string
}

export class DiscoverEndpoint extends BaseEndpoint {
  constructor(protected readonly accessToken: string) {
    super(accessToken);
  }

  async movies({ providerIds, watch_region, page, sort_by }: DiscoverRequest): Promise<Search<Movie>> {
    const with_watch_providers = Array.isArray(providerIds) ? providerIds.join('|') : [providerIds];

    const params = querystring.encode({
      sort_by: sort_by ?? 'popularity.desc',
      watch_region: watch_region ?? 'US',
      page: page ?? 1,
      with_watch_providers,
      with_watch_monetization_type: 'flatrate',
    });

    return await this.api.get<Search<Movie>>(
      `/discover/movie?${params}`,
    );
  }
}
