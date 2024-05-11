import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as azdev from 'azure-devops-node-api';
import { IWorkItemTrackingApi } from 'azure-devops-node-api/WorkItemTrackingApi';

@Injectable()
export class AzureService {
  config: string;
  azureToken: string;
  azdev: any;
  projectName: string;
  serverURL: string;
  orgName: string;
  webApi: azdev.WebApi;
  workItemTracking: IWorkItemTrackingApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.config = this.configService.get('TELEGRAM_TOKEN');
    this.azureToken = this.configService.get('AZURE_ACCESS_TOKEN');
    this.projectName = this.configService.get('PROJECT_NAME');
    this.serverURL = this.configService.get('SERVER_URL');
    this.orgName = this.configService.get('ORG_URL');
    this.azdev = azdev;

    this.connection();
  }

  async connection() {
    const authHandler = azdev.getPersonalAccessTokenHandler(this.azureToken);
    this.webApi = new azdev.WebApi(this.orgName, authHandler);
  }

  async getTask(id: number) {
    try {
      this.workItemTracking = await this.webApi.getWorkItemTrackingApi();
      await this.workItemTracking;
    } catch (error) {
      console.error(error);
    }
    const workItem = await this.workItemTracking.getWorkItems([id]);

    return {
      project: workItem[0]?.fields?.['System.TeamProject'] ?? '',
      itemType: workItem[0]?.fields?.['System.WorkItemType'] ?? '',
      state: workItem[0]?.fields?.['System.State'] ?? '',
      assignedTo: workItem[0]?.fields?.['System.AssignedTo'].displayName ?? '',
      priority: workItem[0]?.fields?.['Microsoft.VSTS.Common.Priority'] ?? '',
      // url: workItem[0]?._links?.html?.href || workItem[0]?.url,
      reason: workItem[0]?.fields?.['System.Reason'] ?? '',
    };
  }
}
