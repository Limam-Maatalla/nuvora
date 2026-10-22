const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
export const mockAnalyticsProvider={
 async getOverview(){return {visitors:1284,activeUsers:37,sessions:1920,pageViews:4831,source:'mock'};},
 async getWeeklyVisitors(){return days.map((day,i)=>({day,visitors:[112,146,138,182,201,164,229][i]}));},
 async getActivity(){return [{label:'Dashboard page views',value:812},{label:'Study planner opens',value:431},{label:'Awareness check-ins',value:287},{label:'Assistant page opens',value:194}];},
 async getDevices(){return [{label:'Desktop',value:58},{label:'Mobile',value:34},{label:'Tablet',value:8}];}
};