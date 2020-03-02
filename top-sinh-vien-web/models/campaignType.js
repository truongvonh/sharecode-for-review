import { SchoolModel } from 'models/school';

export class CampaignTypeModel {
  constructor(campaignType) {
    this._id = campaignType._id;
    this.cover = campaignType.cover;
    this.avatar = campaignType.avatar;
    this.name = campaignType.name;
    this.startTime = campaignType.startTime;
    this.endTime = campaignType.endTime;
    this.ruleWeb = campaignType.ruleWeb;
    this.coverWeb = campaignType.coverWeb;
    this.rewardWeb = campaignType.rewardWeb;
    this.avatarWeb = campaignType.avatarWeb;
    if (campaignType.champion) {
      this.champion = campaignType.champion;
      this.champion.school = new SchoolModel(campaignType.champion.school);
    }
    if (campaignType.secondBest) {
      this.secondBest = campaignType.secondBest;
      this.secondBest.school = new SchoolModel(campaignType.secondBest.school);
    }
    if (campaignType.totalVote) {
      this.totalVote = campaignType.totalVote;
      this.totalComment = campaignType.totalComment;
      this.share = campaignType.share;

    }
  }
}
