import * as Discussions from "@/models/discussions";
import * as Comments from "@/models/comments";
import * as Time from "@/utils/time";

import { ItemType, FormState } from "./form";

export function useForDiscussion(discussion: Discussions.Discussion, comments: Comments.Comment[]): FormState {
  const [post, { loading: submittingPost }] = Comments.useCreateComment();
  const [edit, { loading: submittingEdit }] = Comments.useEditComment();

  const items = comments.map((comment) => {
    return {
      type: "comment" as ItemType,
      insertedAt: Time.parse(comment.insertedAt)!,
      value: comment,
    };
  });

  const postComment = async (content: string) => {
    await post({
      entityId: discussion.id,
      entityType: "message",
      content: JSON.stringify(content),
    });
  };

  const editComment = async (commentID: string, content: string) => {
    await edit({
      commentId: commentID,
      content: JSON.stringify(content),
      parentType: "message",
    });
  };

  return {
    items,
    postComment,
    editComment,
    submitting: submittingPost || submittingEdit,
  };
}
