import UserModel from './User';

export class ReportModel {
  constructor(report) {
    this._id = report._id;
    this.userReport = new UserModel(report.user);
    this.reportObj = this.checkReportObj(report);
    this.photos = report.photos;
    this.reason = report.reason;
    this.title = report.title;
    this.reportType = this.checkTypeReport(report.onModel);
  }

  allReportEnum = ['LocationReview', 'SchoolReview', 'GroupPost', 'Users', 'Comment'];

  checkReportObj = (report) => {
    const isUserModel = report.onModel === this.allReportEnum[3];
    const result = isUserModel ?
      new UserModel(report.document) :
      report.document;
    if (isUserModel)
      return result.fullName;
    else
      return result.content;
  };

  checkTypeReport = (report) =>
        report === this.allReportEnum[0] ? 'Đánh giá địa điểm'
      : report === this.allReportEnum[1] ? 'Đánh giá trường học'
      : report === this.allReportEnum[2] ? 'Bài viết nhóm'
      : report === this.allReportEnum[3] ? 'Người dùng'
      : 'Bình luận';
}
