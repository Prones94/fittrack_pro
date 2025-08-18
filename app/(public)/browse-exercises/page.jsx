import { useBodyPartList, useTargetList, useEquipmentList } from "@/hooks";

const { data: bodyParts } = useBodyPartList()
const { data: targets } = useTargetList()
const { data: equipment } = useEquipmentList()