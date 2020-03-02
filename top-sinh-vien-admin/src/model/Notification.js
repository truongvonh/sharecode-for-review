import UserModel from './User';
import { getFromNow } from 'utils/helper';

const allReportTypeEnum = ['LOCATIONREVIEW', 'SCHOOLREVIEW', 'GROUPPOST', 'USER', 'COMMENT'];

export class NotificationModel {
  constructor(notification) {
    this._id = notification._id;
    this.typeReport = this.checkTypeReport(notification.type);
    this.sender = new UserModel(notification.sender);
    this.email = notification.sender && notification.sender.email;
    this.read = notification.read;
    this.document = notification.document;
    this.createdAt = this.checkFromNow(notification.createdAt);
  }

  checkTypeReport = (type) =>
    type === allReportTypeEnum[0] ? 'đã báo cáo đánh giá địa điểm'
      : type === allReportTypeEnum[1] ? 'đã báo cáo đánh giá trường học'
      : type === allReportTypeEnum[2] ? 'đã báo cáo bài viết trong nhóm'
      : type === allReportTypeEnum[3] ? 'đã báo cáo người dùng'
      : 'đã báo cáo bình luận'

  checkFromNow = (time) => getFromNow(time);
}
