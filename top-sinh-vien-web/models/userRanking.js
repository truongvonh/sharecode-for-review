import { UserProfile } from './user';

export class Ranking {
  constructor(ranking) {
    this.follow = ranking.follow;
    this.ranking = ranking.ranking;
    this.user_ranking = new UserRanking(ranking.user_ranking);
  }
}

export class UserRanking {
  constructor(userRanking) {
    this.profile = new UserProfile(userRanking.profile);
    this.point = userRanking.point;
    this._id = userRanking._id;
    this.id_badge = userRanking.id_badge[0].photos[0].thumb;
  }
}
