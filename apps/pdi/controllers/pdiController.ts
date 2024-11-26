import { Request, Response, Next } from "express";
import { PdiChecklistRepo } from "../model/pdiRepo"; // Adjust the import path based on your project structure
import { get } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";


class PdiChecklistController {
    // Create a new PDI Checkpoint
    static async create(req: Request, res: Response) {
        try {
            const user_id = get(req, 'user_id', '');
            const payload = { ...req.body, createdBy: user_id };
            const newChecklist = await new PdiChecklistRepo().create(payload);

            return res.status(200).json({
                message: "PDI Checklist created successfully",
                data: newChecklist,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid request body" });
        }
    }

    static async list(req: Request, res: Response) {
        try {
            const size = get(req.query, "size", 10);
            const skip = get(req.query, "skip", 0);
            const search = get(req.query, "search", "");
            const trashOnly = get(req.query, "trashOnly", "");
            let sorting = get(req.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const id = get(req.query, "id", "");
            const title = get(req.query, "title", "");
            const createdBy = get(req.query, "createdBy", "");

            const filters = {};
            if (id) filters["id"] = id;
            if (title) filters["title"] = title;
            if (createdBy) filters["createdBy"] = createdBy;

            const Checkpoints = await new PdiChecklistRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting,
                trashOnly: trashOnly as string,
                filters
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Checkpoints
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Update a PDI Checkpoint
    static async update(req: Request, res: Response) {
        try {
            const id = get(req.params, "id", 0);
            const updateData = req.body;
            delete updateData.id;
            const user_id = get(req, "user_id", "");

            // Use the repo to find the Checkpoint by ID
            const checkpoint = await new PdiChecklistRepo().findByPk(id);
            if (!checkpoint) {
                return res.status(404).json({ message: "PDI Checklist not found" });
            }

            // Update the Checkpoint in the repo
            const updatedCheckpoint = await new PdiChecklistRepo().update(id as number, { ...updateData, updatedBy: user_id });

            return res.status(200).json({
                message: "PDI Checkpoint updated successfully",
                data: { ...checkpoint, ...updatedCheckpoint }, // Return the updated Checkpoint data
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid request body" });
        }
    }

    // Get a PDI Checkpoint by ID
    static async get(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const checkpoint = await new PdiChecklistRepo().findByPk(id);
            if (!checkpoint) {
                return res.status(404).json({ message: "PDI Checkpoint not found" });
            }

            return res.status(200).json({
                message: "PDI Checklist retrieved successfully",
                data: checkpoint,
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

            // Check if any Checkpoint were deleted
            if (deletedCount === 0) {
                return res.status(404).json({ message: "PDI Checkpoint not found" });
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
