import React from "react";

import { useDocumentTitle } from "@/layouts/header";

import * as Icons from "@tabler/icons-react";
import * as Paper from "@/components/PaperContainer";

import Activity from "./Activity";
import Header from "./Header";
import Timeline from "./Timeline";
import Description from "./Description";
import Sidebar from "./Sidebar";
import KeyResources from "./KeyResources";

import client from "@/graphql/client";
import * as Projects from "@/graphql/Projects";
import * as Me from "@/graphql/Me";

interface LoaderResult {
  project: Projects.Project;
  me: any;
}

export async function loader({ params }): Promise<LoaderResult> {
  let projectData = await client.query({
    query: Projects.GET_PROJECT,
    variables: { id: params.id },
    fetchPolicy: "network-only",
  });

  let meData = await client.query({
    query: Me.GET_ME,
    fetchPolicy: "network-only",
  });

  return {
    project: projectData.data.project,
    me: meData.data.me,
  };
}

export function Page() {
  const [data, refetch, fetchVersion] = Paper.useLoadedData() as [LoaderResult, () => void, number];

  const project = data.project;
  const me = data.me;

  useDocumentTitle(project.name);

  const championOfProject = project.champion?.id === me.id;

  const [sidebarOpen, setSidebarOpen] = React.useState(championOfProject);

  const sidebar = championOfProject ? (
    <Sidebar project={project} isOpen={sidebarOpen} setOpen={setSidebarOpen} />
  ) : null;

  return (
    <Paper.Root size="medium" rightSidebar={sidebar} rightSidebarWidth={sidebarOpen ? "400px" : "0px"}>
      <div className="p-8 border border-dark-3 bg-dark-3 rounded shadow-xl">
        <div className="bg-dark-2 p-8 -mx-8 -mt-8">
          <Header project={project} />
        </div>

        <div className="border border-dark-8 rounded-lg shadow-lg bg-dark-3 p-4 mb-8 mt-8">
          <Description me={me} project={project} refetch={refetch} />
          <KeyResources editable={championOfProject} project={project} refetch={refetch} />
        </div>

        <Timeline project={project} refetch={refetch} editable={championOfProject} />

        <Activity project={project} key={fetchVersion} />
      </div>
    </Paper.Root>
  );
}
