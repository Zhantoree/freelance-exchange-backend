import ApiError from "../exceptions/api-error.js";
import ProjectService from "../service/project-service.js";
import projectService from "../service/project-service.js";

class ProjectController {
    // Создание проекта
    async getAnswer(req, res, next) {
        try {
            const {client_id, title, description, budget} = req.body
            const projectData = await ProjectService.createProject(client_id, title, description, budget)
            return res.status(200).json(projectData)
        } catch (e) {
            next(e)
        }
    }

    // Получение всех проектов по пользователю

    async getAllProjectsByUser(req, res, next) {
        try {
            const userId = req.params.userId
            const projects = await projectService.getAllProjectsByUser(userId)
            return res.status(200).json(projects)
        } catch (e) {
            next(e)
        }
    }

}

export default new ProjectController()