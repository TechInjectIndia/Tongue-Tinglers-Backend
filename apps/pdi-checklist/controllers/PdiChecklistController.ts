import { Request, Response } from "express";
import { PdiChecklistRepo } from "../models/PdiChecklistRepo"; // Adjust the import path based on your project structure

class PdiChecklistController {
    // Create a new PDI Checklist
    static async create(req: Request, res: Response) {
        try {
            const { franchiseeId, checklistName, pdiDate, status, items } = req.body;

            const newChecklist = await new PdiChecklistRepo().create({
                franchiseeId,
                checklistName,
                pdiDate,
                status,
                items,
            });

            return res.status(200).json({
                message: "PDI Checklist created successfully",
                data: newChecklist,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid request body" });
        }
    }

    // Update a PDI Checklist
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { checklistName, pdiDate, status, items, franchiseeId } = req.body;

            // Use the repo to find the checklist by ID
            const checklist = await new PdiChecklistRepo().findByPk(id);
            if (!checklist) {
                return res.status(404).json({ message: "PDI Checklist not found" });
            }

            // Prepare the updated data
            const updatedData = {
                franchiseeId,
                checklistName,
                pdiDate,
                status,
                items,
            };

            // Update the checklist in the repo
            const [affectedCount] = await new PdiChecklistRepo().update(id, updatedData);

            // Check if the update was successful
            if (affectedCount === 0) {
                return res.status(400).json({ message: "PDI Checklist update failed" });
            }

            return res.status(200).json({
                message: "PDI Checklist updated successfully",
                data: { ...checklist, ...updatedData }, // Return the updated checklist data
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid request body" });
        }
    }

    // Get a PDI Checklist by ID
    static async get(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const checklist = await new PdiChecklistRepo().findByPk(id);
            if (!checklist) {
                return res.status(404).json({ message: "PDI Checklist not found" });
            }

            return res.status(200).json({
                message: "PDI Checklist retrieved successfully",
                data: checklist,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid request" });
        }
    }

    // Delete a PDI Checklist
    static async delete(req: Request, res: Response) {
        try {
            const { ids } = req.body;

            // Call the repo's delete method directly with the ids
            const deletedCount = await new PdiChecklistRepo().delete(ids);

            // Check if any checklists were deleted
            if (deletedCount === 0) {
                return res.status(404).json({ message: "PDI Checklist not found" });
            }

            return res.status(200).json({
                message: "PDI Checklist deleted successfully",
                deletedCount, // Optional: include how many were deleted
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid request body" });
        }
    }
}

export default PdiChecklistController;
