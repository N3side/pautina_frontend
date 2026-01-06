import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import {Button} from "@mui/material";
import {COLORS, colorStyles} from "@/shared/styles/colors";

export default function Password() {

    async function handleSubmit(e) {
        e.preventDefault()
    }

    return (
        <div className="">
            <div className="flex flex-col gap-[15px] w-full">
                <Heading variant="h4">
                    Пароль
                </Heading>

                <PautinaText variant="secondary">
                    И завершающий штрих - безопасность. Придумайте пароль для входа в личный кабинет
                </PautinaText>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="email">
                        <PautinaText variant="secondary" style={{fontWeight: 700}}>
                            Пароль *
                        </PautinaText>
                    </label>
                    <input name="text" defaultValue="" placeholder="Пароль" id="" className="w-full px-5 py-[15px] rounded-[6px]" style={{ border: `1px solid ${COLORS.gray[2]}`, boxShadow: `0px 3px 12px ${COLORS.gray[1]}` }}/>
                    {/*{errors?.email}*/}
                </div>

                <ShadowWrapper>
                    <Button type="submit" style={{ marginTop: "15px", background: colorStyles.buttons.brand.light, padding: "15px 0px", borderRadius: '12px', width: "100%" }}>
                        <PautinaText variant="button2" color={COLORS.white}>
                            Перейти в профиль
                        </PautinaText>
                    </Button>
                </ShadowWrapper>

            </form>
        </div>
    )
}