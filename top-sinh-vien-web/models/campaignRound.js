import { CampaignTypeModel } from 'models/campaignType';

export default class CampaignRoundModel {
  constructor(campaignRound) {
    this.name_round = campaignRound.name_round;
    this.title = campaignRound.title;
    this._id = campaignRound._id;
    this.updatedAt = campaignRound.updatedAt;
    this.startTime = campaignRound.startTime;
    this.endTime = campaignRound.endTime;
    this.type = new CampaignTypeModel(campaignRound.type);
  }
}
