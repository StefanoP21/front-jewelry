import { api } from "../lib/api";
import { MaterialDto } from "../models";
import { MaterialListResponse, MaterialResponse } from "../models/material/model";

export const MaterialService = {
  getAllMaterials: async (): Promise<MaterialListResponse> => {
    const { data } = await api.get<MaterialListResponse>("/api/material");
    return data;
  },

  getMaterialById: async (id: number): Promise<MaterialResponse> => {
    const { data } = await api.get<MaterialResponse>("/api/material/" + id);
    return data;
  },

  createMaterial: async (dto: MaterialDto): Promise<MaterialResponse> => {
    const { data } = await api.post<MaterialResponse>("/api/material", dto);
    return data;
  },

  updateMaterialById: async (id: number, dto: MaterialDto): Promise<MaterialResponse> => {
    const { data } = await api.put<MaterialResponse>("/api/material/" + id, dto);
    return data;
  },

  deleteMaterialById: async (id: number): Promise<MaterialResponse> => {
    const { data } = await api.delete<MaterialResponse>("/api/material/" + id);
    return data;
  },
};
