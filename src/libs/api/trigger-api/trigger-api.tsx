import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Response } from "@zenra/model";
import { postAuthenticated } from "@zenra/functions";
import { docker_backup_data_generator } from "@zenra/controller";

export const DockerExcelGenerator = (payload: any) => {
    const { mutate: dockerExcelGeneratorMutate } = useMutation({
        mutationFn: async () => {
            const response = await postAuthenticated(docker_backup_data_generator, payload);
            return response.data;
        },
        onSuccess: (response: Response) => response,
        onError: (err: AxiosError) => err,
    });
    return {
        dockerExcelGeneratorMutate,
    };
}
