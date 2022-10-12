export interface IBIEventModel {
  /**
   * name of the event
   * e.g. JSON.stringify({ requestPath: 'xxx', requestParams: 'xxx'});
   */
  name: string;
  /**
   * type of the event
   */
  type: string;
  /**
   * tags of the event
   */
  tags: string[];
  startTime: number;
  endTime: number;
  desc: string;
}

