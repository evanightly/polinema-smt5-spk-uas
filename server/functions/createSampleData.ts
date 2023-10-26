import Alternative from "../models/Alternative";
import Criteria from "../models/Criteria";
import Score from "../models/Score";
import StudyCase from "../models/StudyCase";

export default async function createSampleData() {
    const sampleStudyCase = await StudyCase.create({ title: 'Jalan Terbaik' })

    const sampleCriteria = await Criteria.create([
        {
            title: 'Lokasi',
            studyCase: sampleStudyCase,
            type: 'Benefit',
            weight: 5
        },
        {
            title: 'Luas Tanah (m^2)',
            studyCase: sampleStudyCase,
            type: 'Benefit',
            weight: 4
        },
        {
            title: 'Harga (jt/m)',
            studyCase: sampleStudyCase,
            type: 'Cost',
            weight: 4
        },
        {
            title: 'Ukuran',
            studyCase: sampleStudyCase,
            type: 'Benefit',
            weight: 3
        },
        {
            title: 'Resiko',
            studyCase: sampleStudyCase,
            type: 'Cost',
            weight: 4
        }
    ])
    
    const sampleAlternative = await Alternative.create([
        {
            title: 'Jalan A',
            studyCase: sampleStudyCase
        },
        {
            title: 'Jalan B',
            studyCase: sampleStudyCase
        },
        {
            title: 'Jalan C',
            studyCase: sampleStudyCase
        },
    ])

    const sampleScore = await Score.create([
        // Row 1
        {
            alternative: sampleAlternative[0],
            criteria: sampleCriteria[0],
            score: 4
        },
        {
            alternative: sampleAlternative[0],
            criteria: sampleCriteria[1],
            score: 2000
        },
        {
            alternative: sampleAlternative[0],
            criteria: sampleCriteria[2],
            score: 5000
        },
        {
            alternative: sampleAlternative[0],
            criteria: sampleCriteria[3],
            score: 3
        },
        {
            alternative: sampleAlternative[0],
            criteria: sampleCriteria[4],
            score: 1
        },

        // Row 2
        {
            alternative: sampleAlternative[1],
            criteria: sampleCriteria[0],
            score: 2
        },
        {
            alternative: sampleAlternative[1],
            criteria: sampleCriteria[1],
            score: 5000
        },
        {
            alternative: sampleAlternative[1],
            criteria: sampleCriteria[2],
            score: 2000
        },
        {
            alternative: sampleAlternative[1],
            criteria: sampleCriteria[3],
            score: 4
        },
        {
            alternative: sampleAlternative[1],
            criteria: sampleCriteria[4],
            score: 4
        },

        // Row 3
        {
            alternative: sampleAlternative[2],
            criteria: sampleCriteria[0],
            score: 3
        },
        {
            alternative: sampleAlternative[2],
            criteria: sampleCriteria[1],
            score: 4000
        },
        {
            alternative: sampleAlternative[2],
            criteria: sampleCriteria[2],
            score: 3000
        },
        {
            alternative: sampleAlternative[2],
            criteria: sampleCriteria[3],
            score: 4
        },
        {
            alternative: sampleAlternative[2],
            criteria: sampleCriteria[4],
            score: 3
        },
    ])
}