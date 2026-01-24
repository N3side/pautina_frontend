import Role from "@/shared/vector/activity/Role"
import Edit from "@/shared/vector/Edit"
import {activity, contacts, Elems} from "@/app/profile/widgets/bio/model";
import {Elem} from "@/app/profile/widgets/bio/ui/Elem";
import {PautinaText} from "@/shared/cat/typography/text";
import {IconWrapper} from "@/shared/components/IconWrapper";
import {Button} from "@mui/material";
import {Heading} from "@/shared/cat/typography/headings";
import {colorStyles} from "@/shared/cat/colors";

export default function BioWidget() {

    return (
        <section className="pl-[clamp(20px,1.250vw_+_16.000px,40px)] mt-[30px]">
            <header className="flex items-center justify-between">
                <div className="flex items-center gap-[4px]">
                    <Button style={{minWidth: "0px", padding: "8px"}}>
                        <IconWrapper>
                            <Role className="w-[18px] h-[18px]" />
                        </IconWrapper>
                    </Button>
                    <Heading variant="h6" color={colorStyles.text.h6.light} style={{fontWeight: "700"}}>
                        Основная информация
                    </Heading>
                </div>
                <Button style={{minWidth: "0px", padding: "8px"}}>
                    <IconWrapper>
                        <Edit />
                    </IconWrapper>
                </Button>
            </header>
            <main>
                <div className="bio">
                    <header>
                        <PautinaText variant="small" className="mt-[20px]" color={colorStyles.text.p_tiny.light} style={{fontWeight: 700, textTransform: "uppercase"}}>
                            Обо мне (Bio)
                        </PautinaText>
                    </header>
                    <PautinaText className="mt-[10px]" variant="secondary">
                        Увлеченный разработчик с фокусом на Frontend технологии. Занимаюсь созданием
                        удобных интерфейсов и изучением современных фреймворков. Активный участник
                        хакатонов и профильных олимпиад. В поиске интересных проектов для стажировки.
                    </PautinaText>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-y-[30px] gap-x-[120px] mt-[30px]">
                    <div className="flex flex-col gap-[20px]">
                        <header>
                            <PautinaText variant="small" color={colorStyles.text.h6.light} style={{
                                fontWeight: 700,
                                textTransform: "uppercase"
                            }}>
                                Деятельность
                            </PautinaText>
                        </header>
                        <ul className="flex flex-col gap-[30px]">
                            {activity?.map((elem: Elems, i: number) =>
                                <Elem key={i} Icon={elem?.Icon} k={elem?.k} value={elem?.value}/>
                            )}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-[20px]">
                        <header>
                            <PautinaText variant="small" color={colorStyles.text.h6.light} style={{
                                fontWeight: 700,
                                textTransform: "uppercase"
                            }}>
                                Контактная информация
                            </PautinaText>
                        </header>
                        <ul className="flex flex-col gap-[30px]">
                            {contacts?.map((elem: Elems, i: number) =>
                                <Elem key={i} Icon={elem?.Icon} k={elem?.k} value={elem?.value}/>
                            )}
                        </ul>
                    </div>
                </div>
            </main>
        </section>
    )
}