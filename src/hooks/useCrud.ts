import { useState } from "react";
import { toast } from "react-toastify";
import { useApi } from "./useApi";
// import assert from "assert";

interface Options {
  meta?: boolean;
}
interface method_type {
  _method: string;
}

const defaultOptions = {
  meta: false,
};

export function useCrud(url: string, options?: Options) {
  options = { ...defaultOptions, ...options };
  const api = useApi();

  const [state, setState] = useState({
    loading: true,
    errors: null,
    data: [] as any[],
    item: null as any | null,
    meta: null as Meta | null,
  });

  const setLoading = (val: boolean) => {
    setState({ ...state, loading: val });
  };

  const deafultParams: any = {};

  const fetch: any = async (params = deafultParams) => {
    setState((prevState) => ({
      ...prevState,
      data: [],
      loading: true,
      errors: null,
    }));

    try {
      const { data } = await api.get(url, {
        params: { ...params },
      });
      setState((prevState) => ({
        ...prevState,
        data: data.data ? data.data : data,
        loading: false,
        meta: data.meta,
      }));

      return state.data ?? [];
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("404 log not found");
      }
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
      setState((prevState) => ({
        ...prevState,
        errors: error,
        loading: false,
      }));
      throw error;
    }
  };

  const fetchById = async (id: number | string) => {
    setState((prevState) => ({
      ...prevState,
      errors: null,
    }));
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get(`${url}/${id}`);
        setState((prevState) => ({
          ...prevState,
          data: data.data ? data.data : [],
          loading: false,
          item: data,
          meta: data.meta || null,
        }));
        resolve(data);
      } catch (error: any) {
        if (error.response.status === 404) {
          toast.error("404 log not found");
        }
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        }
        setState((prevState) => ({
          ...prevState,
          errors: error,
          loading: false,
        }));
        reject(error);
      }
    });
  };

  const create = async (payload?: any, headers?: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.post(
          `${url}`,
          payload,
          headers && { headers }
        );
        resolve(data);
      } catch (error: any) {
        if (error.response.status === 404) {
          toast.error("404 not found");
        }
        if (error.response.data.errors) {
          toast.error(
            error.response.data.message || error.response.data.errors.toString()
          );
        }
        reject(error);
      }
    });
  };

  const update = async ({
    id,
    payload,
    headers,
  }: {
    id: string | number;
    payload: any;
    headers?: any;
  }) => {
    setState((prevState) => ({
      ...prevState,
      errors: null,
    }));
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.put(
          `${url}/${id}`,
          payload,
          headers && { headers }
        );
        resolve(data);
      } catch (error: any) {
        if (error.response.status === 404) {
          toast.error("404 log not found");
        }
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        }
        reject(error);
      }
    });
  };

  const remove = async (item: any, title?: string) => {
    if (
      !(await toast.warning(
        `هل انت متأكد بأنك تريد حذف "${title ?? "هذا العنصر"}" ؟`
      ))
    )
      return;

    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      await api.delete(`${url}/${item.id}`);
      const index = state.data.findIndex((i: any) => i.id === item.id);
      index !== -1 &&
        setState((prevState) => ({
          ...prevState,
          data: state.data.splice(index, 1),
        }));
      toast.success("تم حذف البيانات بنجاح.");
    } catch (error: any) {
      if (error.response.status === 404) {
        toast.error("404 log not found");
      }
      if (error.response.data.error) {
        toast.error(error.response.data.error);
      }
      throw error;
    }
    setState((prevState) => ({
      ...prevState,
      loading: false,
    }));
  };

  return {
    ...state,
    fetch,
    fetchById,
    create,
    update,
    remove,
    setLoading,
  };
}
