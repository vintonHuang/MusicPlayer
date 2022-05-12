/*
 * @Author: Vinton
 * @Date: 2022-03-29 11:44:38
 * @Description: file content
 */
export const useImportResForOss = () => {
  const importResource = (url: string | any) => {
    return import.meta.env.VITE_RESOURSE_BASW_URL + url;
  };
  return {
    importResource,
  };
};
