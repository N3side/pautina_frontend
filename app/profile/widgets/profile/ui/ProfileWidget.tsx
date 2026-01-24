import { PautinaText } from "@/shared/cat/typography/text";
import { Button } from "@mui/material";

import Download from "@/shared/vector/Download";
import { Heading } from "@/shared/cat/typography/headings";
import {COLORS, colorStyles} from "@/shared/cat/colors";
import {useContext} from "react";
import {WindowContext} from "@/shared/providers/WindowProvider";
import {UserContext} from "@/shared/providers/UserProvider";


export default function ProfileWidget() {

    const {_window} = useContext(WindowContext)

    const {user} = useContext(UserContext)

    return (
        <section className={`max-w-[386px] w-full h-full rounded-[16px] ${_window?.innerWidth && _window.innerWidth < 1170 ? "max-w-none" : ""}`}>
            <header className="w-full h-[128px] rounded-[16px]" style={{
                background: COLORS.brand[9],
                borderBottomRightRadius: "0px",
                borderBottomLeftRadius: "0px"
            }}></header>

            <main className="relative w-full h-full px-[clamp(20px,1.250vw_+_16.000px,40px)]">
                <div className="absolute left-[50%] max-h-[128px] max-w-[128px] w-full h-full rounded-[50%]" style={{transform: "translateY(-50%) translateX(-50%)"}}>
                    <img src={user?.avatar} alt="avatar" className="w-full h-full rounded-[50%]" style={{
                        objectFit: "cover"
                    }}/>
                </div>

                <div className="w-full flex items-center flex-col pt-[80px]">
                    <Heading variant="h5" style={{
                        textAlign: "center"
                    }}>
                        {user?.full_name}
                    </Heading>

                    <PautinaText variant="secondary" className="mt-[5px]">
                        {user?.bio}
                    </PautinaText>

                    <Button style={{
                        marginTop: "20px",
                        display: "flex",
                        gap: "3px",
                        width: "100%",
                        alignItems: "center"
                    }}>

                        <Download />

                        <PautinaText variant="secondary" style={{
                            textTransform: "none",
                            fontWeight: "500"
                        }}>
                            Скачать портфолио
                        </PautinaText>
                    </Button>
                </div>
                <div className="w-full flex justify-between items-center mt-[50px]">
                    <div className="flex flex-col items-center">
                        <PautinaText variant="large" className="w-fit" style={{
                            fontWeight: "700"
                        }}>
                            {user?.documents_count}
                        </PautinaText>

                        <PautinaText variant="tiny" color={colorStyles.text.p_tiny.light} style={{
                            textTransform: "uppercase"
                        }}>
                            Документов
                        </PautinaText>
                    </div>
                    <div className="flex flex-col items-center">
                        <PautinaText variant="large" className="w-fit" style={{
                            fontWeight: "700"
                        }}>
                            {user?.projects_count}
                        </PautinaText>

                        <PautinaText variant="tiny" color={colorStyles.text.p_tiny.light} style={{
                            textTransform: "uppercase"
                        }}>
                            Проектов
                        </PautinaText>
                    </div>
                </div>
            </main>

    </section>
    )
}