import * as sectionsRepository from "../repositories/sectionsRepository.js";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const sections = await sectionsRepository.getAll(user_id);
    return res.status(200).json(sections);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const section = req.body;
    if (!section.name) return res.status(400).json({ error: "Missing name for section" });
    if (!section.goal) return res.status(400).json({ error: "Missing goal for section" });
    const created_section = await sectionsRepository.create(user_id, section.name, section.goal);
    if (!created_section) return res.status(404).json({ error: "Section creation unsuccessful" });
    return res.status(200).json(created_section);
};

const remove = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.sectionId);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
    const removed_section = await sectionsRepository.remove(id, user_id);
    if (!removed_section) return res.status(404).json({ error: "Section deletion unsuccessful" });
    return res.status(200).json(removed_section);
};

const removeAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const removed_sections = await sectionsRepository.removeAll(user_id);
    if (!removed_sections) return res.status(404).json({ error: "Section deletions unsuccessful" });
    return res.status(200).json(removed_sections);
};

const modify = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.sectionId);
    if (!Number.isInteger(id)) return res.status(400).json({ error: "Invalid id" });
    const section = req.body;
    if (!section.name) return res.status(400).json({ error: "Missing name for section" });
    if (!section.goal) return res.status(400).json({ error: "Missing goal for section" });
    const modified_section = await sectionsRepository.modify(id, user_id, section.name, section.goal);
    if (!modified_section) return res.status(404).json({ error: "Section modification unsuccessful" });
    return res.status(200).json(modified_section);
};

export { getAll, create, remove, removeAll, modify };