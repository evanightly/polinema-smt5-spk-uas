import Alternative from "../models/Alternative";
import CaseStudy from "../models/CaseStudy";
import Criteria from "../models/Criteria";
import Score from "../models/Score";

/**
 * Used to delete all db collections
 */
export default async function purge() {
    await Alternative.collection.drop()
    await Criteria.collection.drop()
    await CaseStudy.collection.drop()
    await Score.collection.drop()
}