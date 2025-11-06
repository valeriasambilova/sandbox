import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useUrlParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(key, value);
    pushParams(params);
  };

  const deleteParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(key);
    pushParams(params);
  };

  const pushParams = (params: URLSearchParams) => {
    const paramsString = params.toString();

    router.push(params ? `${pathname}?${paramsString}` : pathname);
  };

  return { updateParam, deleteParam };
};
