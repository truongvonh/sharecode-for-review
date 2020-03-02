import { SchoolModel } from 'models/school';
import CampaignRoundModel from 'models/campaignRound';

class CampaignMatchModel {
  constructor(campaignMatch) {
    this._id = campaignMatch._id;
    this.school_team_1 = new SchoolModel(campaignMatch.school_team_1);
    this.school_team_2 = new SchoolModel(campaignMatch.school_team_2);
    this.vote_team_1 = campaignMatch.vote_team_1;
    this.vote_team_2 = campaignMatch.vote_team_2;
    this.battle = campaignMatch.battle;
  }
}

class CampaignRound32Model {
  constructor(campaignRound32) {
    this.team = campaignRound32.team;
    this.vote = campaignRound32.vote;
    this.rank = campaignRound32.rank;
    this.user_vote = campaignRound32.user_vote;
    this.team.school = new SchoolModel(campaignRound32.team.school);
  }
}

class CampaignMatchDetailModel {
   constructor(matchDetail) {
     this.round = new CampaignRoundModel(matchDetail.round);
     this.battle = matchDetail.battle;
     this.team_1 = matchDetail.team_1;
     this.team_1.school = new SchoolModel(matchDetail.team_1.school);

     this.team_2 = matchDetail.team_2;
     this.winner = matchDetail.winner;
     this.team_2.school = new SchoolModel(matchDetail.team_2.school);
   }
}

export {
  CampaignMatchModel,
  CampaignRound32Model,
  CampaignMatchDetailModel
};
