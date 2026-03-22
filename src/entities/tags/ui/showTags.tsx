import Tag from "@/entities/tags/ui/Tag";
import {WheelXScrollProvider} from "@/shared/ui/WheelScrollXWrapper/WheelScrollXWrapper";

interface Props {
    tags: Record<string, any> | null
    deleteTag?: (e, tag) => void
}

export default function ShowTags({tags, deleteTag}: Props) {
    return (
        <div className="flex gap-3">
            <WheelXScrollProvider>
                {
                    tags && tags.map((tag) => (
                        <Tag
                            key={tag.id}
                            color={tag.color}
                            tag={tag.name}
                            onRemove={deleteTag ? (e) => deleteTag(e, tag.id) : undefined}
                        />
                    ))
                }
            </WheelXScrollProvider>
        </div>
    )
}