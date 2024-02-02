import * as Pages from "@/components/Pages";
import * as People from "@/models/people";
import * as Discussions from "@/models/discussions";

interface LoaderResult {
  discussion: Discussions.Discussion;
  me: People.Person;
}

export async function loader({ params }): Promise<LoaderResult> {
  return {
    me: await People.getMe(),
    discussion: await Discussions.getDiscussion(params.id),
  };
}

export function useLoadedData(): LoaderResult {
  return Pages.useLoadedData() as LoaderResult;
}

export function useRefresh() {
  return Pages.useRefresh();
}
