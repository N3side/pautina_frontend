import {Heading} from "@/shared/styles/typography/headings";
import {PautinaText} from "@/shared/styles/typography/text";
import {ShadowWrapper} from "@/shared/wrappers/Shadow";
import {Button} from "@mui/material";
import {COLORS, colorStyles} from "@/shared/styles/colors";
import {useState} from "react";

export default function Name({name, setName, next}) {

    const [errors, setErrors] = useState(null)

    async function handleSubmit(e) {

        setErrors(null)

        e.preventDefault()

        if (!name) {
            setErrors({name: "Пожалуйста, введите ваше имя"})
            return
        }

        next()
    }

    async function handleChange(e) {
        const name_ = e.target.value

        console.log(name_)

        setName(name_)
        localStorage.setItem("user_name", name_)
    }

    return (
        <div>
            <div className="flex flex-col gap-[15px]">
                <Heading variant="h4">
                    Добро пожаловать на платформу Паутина
                </Heading>
                <PautinaText variant="secondary">
                    Для дальнейшей работы предлагаем познакомиться
                </PautinaText>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px] mt-[clamp(20px,1.250vw_+_16.000px,40px)] w-full ">
                <div className="flex flex-col gap-[8px]">
                    <label htmlFor="email">
                        <PautinaText variant="secondary" style={{fontWeight: 700}}>
                            Как вас зовут? *
                        </PautinaText>
                    </label>
                    <input name="text" onChange={handleChange} defaultValue="" placeholder="Введите ваше имя" id="" className="w-full px-5 py-[15px] rounded-[6px]" style={{ border: `1px solid ${COLORS.gray[2]}`, boxShadow: `0px 3px 12px ${COLORS.gray[1]}` }}/>
                    {errors?.name}
                    {/*{errors?.email}*/}
                </div>

                <ShadowWrapper>
                    <Button type="submit" style={{ marginTop: "15px", background: colorStyles.buttons.brand.light, padding: "15px 0px", borderRadius: '12px', width: "100%" }}>
                        <PautinaText variant="button2" color={COLORS.white}>
                            Далее
                        </PautinaText>
                    </Button>
                </ShadowWrapper>

            </form>
        </div>
    )
}