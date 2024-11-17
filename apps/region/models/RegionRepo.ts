import {AreaModel, RegionModel} from "../../../database/schema";
import {IRegion, TPayloadRegion, TRegionList} from "../../../interfaces";
import {TListFiltersRegions} from "../../../types";
import IBaseRepo from "../controllers/controller/IRegionController";
import {Op} from "sequelize";


export class RegionRepo implements IBaseRepo<IRegion, TListFiltersRegions> {
    constructor() {
    }

    /**
     * Get a single region by ID
     * @param id Region ID
     * @returns IRegion or null
     */
    public async get(id: number): Promise<IRegion | null> {
        return await RegionModel.findOne({
            rejectOnEmpty: false,
            where: {id}
        });
    }

    /**
     * List regions with filters and pagination
     * @param filters Filters and pagination options
     * @returns TRegionList
     */
    public async list(filters: TListFiltersRegions): Promise<TRegionList> {
        const whereCondition: any = {};

        // Apply search term to relevant fields
        if (filters.search) {
            whereCondition[Op.or] = [
                {title: {[Op.like]: `%${filters.search}%`}},
                {createdBy: {[Op.like]: `%${filters.search}%`}},
            ];
        }

        // Apply additional filters
        if (filters.filters?.id) {
            whereCondition.id = {[Op.eq]: filters.filters.id};
        }
        if (filters.filters?.title) {
            whereCondition.title = {[Op.like]: `%${filters.filters.title}%`};
        }
        if (filters.filters?.createdBy) {
            whereCondition.createdBy = {[Op.eq]: filters.filters.createdBy};
        }

        // Count total regions
        const total = await RegionModel.count({
            group: undefined,
            where: whereCondition
        });

        // Retrieve paginated regions
        const data = await RegionModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: whereCondition,
        });

        const json = data.map(rm=>rm.toJSON<IRegion>());



        return {total:total.reduce((acc,next)=>acc+next.count,0), data:json};
    }

    /**
     * Create a new region with associated areas
     * @param data Region payload
     * @returns IRegion
     */
    public async create(data: TPayloadRegion): Promise<IRegion> {
        const {area, ...regionData} = data;

        // Validate areas and check their existence
        const existingAreas = await AreaModel.findAll({
            where: {id: area},
            attributes: ['id'],
        });

        const existingAreaIds = existingAreas.map((a) => a.id);
        const nonExistingAreaIds = area.filter(
            (id) => !existingAreaIds.includes(id));

        if (nonExistingAreaIds.length > 0) {
            throw new Error(`Areas with IDs ${nonExistingAreaIds.join(
                ", ")} do not exist.`);
        }

        // Create region
        const region = await RegionModel.create(regionData);

        // Associate areas with the region
        await region.setAreas(area);

        // Return the region with associated areas
        return await RegionModel.findOne({
            rejectOnEmpty: false,
            where: {id: region.id},
            include: [
                {
                    model: AreaModel,
                    as: "areas",
                    attributes: ["id", "title"],
                    through: {attributes: []},
                },
            ]
        }) as IRegion;
    }

    /**
     * Update an existing region
     * @param id Region ID
     * @param data Region payload
     * @returns Affected row count
     */
    public async update(id: number,
        data: TPayloadRegion): Promise<[affectedCount: number]> {
        const [affectedCount]=  await RegionModel.update(data, {
            returning: true,
            where: {id}
        });
        return [affectedCount];
    }

    /**
     * Delete regions by IDs
     * @param ids Array of region IDs
     * @returns Number of deleted rows
     */
    public async delete(ids: number[]): Promise<number> {
        return await RegionModel.destroy({
            where: {id: ids},
        });
    }

    /**
     * Get all regions with their associated areas
     * @returns Array of regions with areas
     */
    public async getRegionsWithAreas(): Promise<IRegion[]> {
        return await RegionModel.findAll({
            include: [
                {
                    model: AreaModel,
                    as: "areas",
                    attributes: ["id", "title"],
                    through: {attributes: []},
                },
            ],
        });
    }
}
