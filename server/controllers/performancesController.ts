import * as performancesRepository from "../repositories/performancesRepository.js";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const performances = await performancesRepository.getAll(user_id);
    return res.status(200).json(performances);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const performance = req.body;
    if (!performance.performance_hours || !performance.hours_spent || !performance.workdate || !performance.section_id) {
        return res.status(400).json({ error: "Missing required parameters" });
    }
    const created_performance = await performancesRepository.create(user_id, performance.workdate, performance.hours_spent,
        performance.performance_hours, performance.section_id);
    if (!created_performance) return res.status(404).json({ error: "Performance creation unsuccessful" });
    return res.status(200).json(created_performance);
};

const remove = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.performanceId);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
    const removed_performance = await performancesRepository.remove(user_id, id);
    if (!removed_performance) return res.status(404).json({ error: "Performance deletion unsuccessful" });
    return res.status(200).json(removed_performance);
};

const removeAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const removed_performances = await performancesRepository.removeAll(user_id);
    if (!removed_performances) return res.status(404).json({ error: "Performances deletion unsuccessful" });
    return res.status(200).json(removed_performances);
};

const updateHours = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.performanceId);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
    const performance = req.body;
    if (!performance.new_hours) return res.status(400).json({ error: "Missing performance hours" });
    const modified_performance = await performancesRepository.updateHours(user_id, id, performance.new_hours);
    if (!modified_performance) return res.status(404).json({ error: "Updating performance unsuccessful" });
    return res.status(200).json(modified_performance);
};

const modify = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.performanceId);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
    const performance = req.body;
    if (!performance.performance_hours || !performance.workdate || !performance.hours_spent || !performance.section_id) {
        return res.status(400).json({ error: "Missing required parameters" });
    }
    const modified_performance = await performancesRepository.modify(user_id, id, performance.workdate,
        performance.hours_spent, performance.performance_hours, performance.section_id);
    if (!modified_performance) return res.status(404).json({ error: "Updating performance unsuccessful" });
    return res.status(200).json(modified_performance);
};

export { getAll, create, remove, removeAll, updateHours, modify };