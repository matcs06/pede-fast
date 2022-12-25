import styles from "./SideBar.module.scss"
import { sideBarOptions } from "./SideBarOptions"
import { IoIosArrowDropleft } from "react-icons/io"
import { useEffect, useState } from "react"
import { setSideBarWidth } from "./SideBarOptions"
export default function SideBar({ children }: any) {

	const [togleBar, setTogleBar] = useState(false)

	function handleClickTogle() {

		setSideBarWidth(togleBar)
		setTogleBar(!togleBar)
	}

	useEffect(() => {
		if (window.screen.width <= 650) {

			document.documentElement.style.setProperty('--sidebar-width', "230px");

		} else {
			document.documentElement.style.setProperty('--sidebar-width', "280px");
		}
	}, [])

	return (
		<>
			<div className={styles.sidebarContainer}>


				<div className={styles.header}>
					<p>Olá, Mateus!</p>
					<div className={styles.togle} onClick={handleClickTogle}>
						<IoIosArrowDropleft size={40} className={styles.togleIcon} />
					</div>
				</div>
				<main>
					<ul className="options">
						{sideBarOptions.map((sidebaroption) => {
							return (
								<li key={sidebaroption.title}>
									<div className={styles.optionIcons}>{sidebaroption.icon}</div>
									<p>{sidebaroption.title}</p>
								</li>
							)
						})}
					</ul>
				</main>


			</div>
		</>
	)
}