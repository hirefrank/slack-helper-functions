import { Gitlab } from "https://esm.sh/@gitbeaker/rest?dts";

// "https://gitlab.com/api/v4/projects"
const api = new Gitlab({
  host: "https://gitlab.com",
  token: "glpat-abPFK9su8qP4XTKPi1Kd",
});

// get a list of all the groups and iterate trhough them

// get a list of all the epics and iterate trhough them

async function getEpics() {
  const groups = await api.Groups.all();
  groups.forEach((group: { [key: string]: any }) => {
    console.log(group.name);
  });
  // const epics = await api.Epics.all();
  // epics.forEach((epic: { [key: string]: any }) => {
  //   console.log(epic.title);
  // });
}

getEpics();
// const projects = await api.Projects.all({ maxPages: 2 });

// // // iterate through projects
// // projects.forEach((project: { [key: string]: any }) => {
// //   console.log(project.name);
// // });

// // const groups = await api.Groups.all({ maxPages: 2 });

// // const groups = await api.Groups.all();
// // console.log(groups);

// async function getGroups() {
//   const groups = await api.Groups.all({ maxPages: 2 });
//   console.log(groups);
// }

// getGroups();

// groups.forEach((group: { [key: string]: any }) => {
//   console.log(group.name);
// });
