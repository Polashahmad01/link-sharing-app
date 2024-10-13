import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import LinkShowCase from "../components/LinkShowCase";
import { getCurrentUserMutation } from "../services/auth.service";

export default function LinkSharingPage() {
  const params = useParams();
  const memoizedParams = useMemo(() => params, [params]);
  const { mutate, data, isPending } = useMutation({
    mutationKey: ["get-current-user"],
    mutationFn: getCurrentUserMutation,
  });
  console.log(params);

  useEffect(() => {
    mutate({ _id: memoizedParams.userId });
  }, [memoizedParams, mutate]);

  return (
    <div className="-mt-16">
      <LinkShowCase />
    </div>
  );
}
