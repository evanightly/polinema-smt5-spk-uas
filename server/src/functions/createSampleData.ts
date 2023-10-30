import createPsiSampleData from "./createPsiSampleData"
import createTopsisSampleData from "./createTopsisSampleData"

export default async function createSampleData() {
    await Promise.all([
        [createPsiSampleData(), createTopsisSampleData()]
    ])

    return 'Sample Created'
}