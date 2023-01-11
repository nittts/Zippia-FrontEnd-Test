export interface IJob {
  [key: string]: string | number | string[];
}

export interface IRequestData {
  jobs: IJob[];
  totalJobs: number;
  remainingJobs: number;
}

export interface ICardData {
  jobTitle: string;
  companyName: string;
  jobDesc: string;
  companyLogo: string;
  postedDate: string;
  estimatedSalary: string;
}
