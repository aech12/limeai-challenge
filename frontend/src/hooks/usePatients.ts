import useSWR from "swr";
import { Patient } from "../types/patient";
import { fetcher } from "../services/api";

export const usePatients = () => {
  const { data, error, isLoading, mutate } = useSWR<Patient[]>(
    "/patients",
    fetcher
  );

  return {
    patients: data || [],
    isLoading,
    error,
    mutate,
  };
};
