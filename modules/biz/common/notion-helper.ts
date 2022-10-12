import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

/**
 * Handle convert notion db ds => standard data structure
 */
export function convertDataToPropertyMap(page: PageObjectResponse) {
  const properties = page?.properties;
  const result: Record<string, string> = {};
  Object.keys(properties).forEach(key => {
    const item = properties[key];
    switch(item.type) {
      case 'number':
        result[key] = String(item.number);
        break;
      case 'url':
        result[key] = String(item.url);
        break;
      case 'select':
        result[key] = item.select?.name || item.select?.id || 'unknown select name';
        break;
      case 'multi_select':
        result[key] = item.multi_select?.map(i => i.name).join(';');
        break;
      case 'status':
        result[key] = item.status?.name || 'unknown status';
        break;
      case 'date':
        result[key] = item?.date?.start || '';
        if (item?.date?.end) {
          result[key] = `${result[key]} -- ${item?.date?.end}`;
        }
        break;
      case 'email':
        result[key] = item?.email || '';
        break;
      case 'phone_number':
        result[key] = item?.phone_number || '';
        break;
      case 'checkbox':
        result[key] = item?.checkbox ? 'true' : 'false';
        break;
      case 'files':
        result[key] = (item?.files || []).map(i => i?.name).join(',');
        break;
      case 'created_time':
        result[key] = item?.created_time;
        break;
      case 'last_edited_time':
        result[key] = item?.last_edited_time;
        break;
      case 'title':
        result[key] = item?.title?.map(i => i?.plain_text).join('\n');
        break;
      case 'rich_text':
        result[key] = item?.rich_text?.map(i => i?.plain_text).join("\n");
        break;
      case 'people':
      case 'relation':
      case 'formula':
      case 'rollup':
        result[key] = 'current not support type content';
        break;
    }
  });
  return result;
}
