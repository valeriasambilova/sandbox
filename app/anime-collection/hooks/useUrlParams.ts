import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createNewParams = () => new URLSearchParams(searchParams.toString());

  const updateParam = (key: string, value: string) => {
    const params = createNewParams();

    params.set(key, value);
    pushParams(params);
  };

  const updateArrayParam = (key: string, values: (string | undefined)[]) => {
    const params = createNewParams();

    params.delete(key);
    const valuesArray = Array.isArray(values)
      ? values
      : [values].filter(Boolean);
    valuesArray.forEach((value) => {
      if (value) {
        params.append(key, value);
      }
    });
    pushParams(params);
  };

  const deleteParam = (key: string) => {
    const params = createNewParams();

    params.delete(key);
    pushParams(params);
  };

  const pushParams = (params: URLSearchParams) => {
    const paramsString = params.toString();

    router.push(params ? `${pathname}?${paramsString}` : pathname);
  };

  return { updateParam, updateArrayParam, deleteParam };
};
