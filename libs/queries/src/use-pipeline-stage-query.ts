import { getAxiosInstance } from '@peerless/services';
import { useQuery } from '@tanstack/react-query';
import { PipelineStageAPI } from '@peerless/utils';

const getPipelineStage = PipelineStageAPI.Get_Pipeline_Stage;

const fetchPipelineStageData = async (payload: any) => {
  const response = await getAxiosInstance().get(getPipelineStage, {
    params: {
      defaultDeptID: payload.defaultDepartmentId
    }
  });
  return response.data;
};

export const usePipelineStageData = (payload: any) => {
  return useQuery({
    queryKey: ['pipelineStageData', payload],
    queryFn: () => fetchPipelineStageData(payload),
    enabled: !!payload,
  });
};