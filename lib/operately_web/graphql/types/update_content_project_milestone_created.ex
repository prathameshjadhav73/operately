defmodule OperatelyWeb.GraphQL.Types.UpdateContentProjectMilestoneCreated do
  use Absinthe.Schema.Notation

  object :update_content_project_milestone_created do
    field :milestone, non_null(:milestone) do
      resolve fn update, _, _ ->
        milestone = Operately.Projects.get_milestone!(update.content["milestone_id"], with_deleted: true)

        {:ok, milestone}
      end
    end
  end
end
