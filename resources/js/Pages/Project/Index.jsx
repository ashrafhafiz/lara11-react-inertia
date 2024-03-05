import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import {
  PROJECT_STATUS_CLASS_MAP,
  PROJECT_STATUS_TEXT_MAP,
} from "../../constants";
import TextInput from "../../Components/TextInput";
import SelectInput from "../../Components/SelectInput";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Index = ({ auth, projects, queryParams = null }) => {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("project.index"), queryParams);
  };
  const handleKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };
  const handleSortChange = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams);
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Projects
        </h2>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sn:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                  <thead className="text-gray-700 uppercase border-b-2 border-gray-500 text-sx bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Project Name..."
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => handleKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-2">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="completed">Completed</option>
                          <option value="inprogress">In Progress</option>
                          <option value="pending">Pending</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2 text-right"></th>
                    </tr>
                  </thead>
                  <thead className="text-gray-700 uppercase border-b-2 border-gray-500 text-sx bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-nowrap">
                      <th
                        onClick={() => handleSortChange("id")}
                        className="px-3 py-2 cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-2 px-3 py-2 cursor-pointer">
                          ID
                          <span>
                            <ChevronUpIcon
                              className={`w-4 h-4 text-gray-500 ${
                                queryParams.sort_field === "id" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                            <ChevronDownIcon
                              className={`w-4 h-4 -mt-1 text-gray-500 ${
                                queryParams.sort_field === "id" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                          </span>
                        </div>
                      </th>
                      <th className="px-3 py-2">Image</th>
                      <th onClick={() => handleSortChange("name")}>
                        <div className="flex items-center justify-between gap-2 px-3 py-2 cursor-pointer">
                          Name
                          <span>
                            <ChevronUpIcon
                              className={`w-4 h-4 text-gray-500 ${
                                queryParams.sort_field === "name" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                            <ChevronDownIcon
                              className={`w-4 h-4 -mt-1 text-gray-500 ${
                                queryParams.sort_field === "name" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                          </span>
                        </div>
                      </th>
                      <th
                        onClick={() => handleSortChange("status")}
                        className="px-3 py-2 cursor-pointer"
                      >
                        Status
                      </th>
                      <th onClick={() => handleSortChange("created_at")}>
                        <div className="flex items-center justify-between gap-2 px-3 py-2 cursor-pointer">
                          Created Date
                          <span>
                            <ChevronUpIcon
                              className={`w-4 h-4 text-gray-500 ${
                                queryParams.sort_field === "created_at" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                            <ChevronDownIcon
                              className={`w-4 h-4 -mt-1 text-gray-500 ${
                                queryParams.sort_field === "created_at" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                          </span>
                        </div>
                      </th>
                      <th onClick={() => handleSortChange("due_date")}>
                        <div className="flex items-center justify-between gap-2 px-3 py-2 cursor-pointer">
                          Due Date
                          <span>
                            <ChevronUpIcon
                              className={`w-4 h-4 text-gray-500 ${
                                queryParams.sort_field === "due_date" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                            <ChevronDownIcon
                              className={`w-4 h-4 -mt-1 text-gray-500 ${
                                queryParams.sort_field === "due_date" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                          </span>
                        </div>
                      </th>
                      <th onClick={() => handleSortChange("created_by")}>
                        <div className="flex items-center justify-between gap-2 px-3 py-2 cursor-pointer">
                          Created By
                          <span>
                            <ChevronUpIcon
                              className={`w-4 h-4 text-gray-500 ${
                                queryParams.sort_field === "created_by" &&
                                queryParams.sort_direction === "asc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                            <ChevronDownIcon
                              className={`w-4 h-4 -mt-1 text-gray-500 ${
                                queryParams.sort_field === "created_by" &&
                                queryParams.sort_direction === "desc"
                                  ? "text-white font-bold"
                                  : ""
                              }`}
                            />
                          </span>
                        </div>
                      </th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => (
                      <tr
                        key={project.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-3 py-2">{project.id}</td>
                        <td className="px-3 py-2">
                          <img
                            src={project.image_path}
                            width={60}
                            alt={project.name}
                          />
                        </td>
                        <td className="px-3 py-3 hover:text-white hover:underline">
                          <Link href={route("project.show", project)}>
                            {project.name}
                          </Link>
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              PROJECT_STATUS_CLASS_MAP[project.status]
                            }`}
                          >
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-nowrap">
                          {project.created_at}
                        </td>
                        <td className="px-3 py-3 text-nowrap">
                          {project.due_date}
                        </td>
                        <td className="px-3 py-3">{project.createdBy.name}</td>
                        <td className="px-3 py-3 text-right">
                          <Link
                            href={route("project.edit", project.id)}
                            className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route("project.destroy", project.id)}
                            className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>
      {/* <pre className="text-slate-200">
        {JSON.stringify(projects, undefined, 2)}
      </pre> */}
    </AuthenticatedLayout>
  );
};

export default Index;
