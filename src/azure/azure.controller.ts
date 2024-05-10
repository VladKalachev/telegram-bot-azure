import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as azdev from 'azure-devops-node-api';
import { IWorkItemTrackingApi } from 'azure-devops-node-api/WorkItemTrackingApi';

@Controller('azure')
export class AzureController {
  config: string;
  azureToken: string;
  azdev: any;
  projectName: string;
  serverURL: string;
  orgName: string;
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
    const webApi = new azdev.WebApi(this.orgName, authHandler);
    try {
      this.workItemTracking = await webApi.getWorkItemTrackingApi();
    } catch (error) {
      console.error(error);
    }
  }

  @Get('task/:id')
  async getTask(@Param('id') id: number) {
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

  @Get()
  getAll() {
    return 'azure:' + this.config;
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return `azure ${id}`;
  }

  @Post('create')
  create(@Body() dto: string) {
    return `azure ${dto}`;
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: string) {
    return `azure ${id}:= ${dto}`;
  }

  @Delete(':id')
  delete(@Param() id: string) {
    return `azure ${id}`;
  }
}
