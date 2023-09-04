defmodule OperatelyWeb.GraphQL.Types.UpdateContentProjectMilestoneDeleted do
  use Absinthe.Schema.Notation

  object :update_content_project_milestone_deleted do
    field :milestone, non_null(:milestone) do
      resolve fn update, _, _ ->
        milestone = Operately.Projects.get_milestone!(update.content["milestone_id"], with_deleted: true)

        {:ok, milestone}
      end
    end
  end
end
