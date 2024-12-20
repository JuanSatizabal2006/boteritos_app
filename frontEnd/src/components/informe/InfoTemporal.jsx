export const InfoTemporal = ({tituloArea, data, children}) => {
    return(
        <div className="w-full divide-y-2 divide-placeholderBlue  bg-white rounded-xl flex flex-col px-10 py-5 gap-y-4">
            <p className="text-darkBlue font-cocogooseSemiLight text-subTitle">{tituloArea}</p>
            {data.map((dataKey)=>(
            <div key={dataKey.id} className="w-full pt-5 gap-y-2 flex flex-col justify-between">
                <p className="font-cocogooseLight text-paragraph">{dataKey.logroTexto}</p>
                <div className="text-darkBlue flex font-cocogooseSemiLight text-subTitle max-w-[250px] w-full justify-between">
                    <p>L.A</p>
                    <p>L.P</p>
                    <p>L.N</p>
                </div>
                <div className="flex leading-none font-cocogooseSemiLight text-subTitle text-orange max-w-[250px] w-full justify-between px-[10px]">
                    <p>X</p>
                    <p>X</p>
                    <p>X</p>
                </div>
            </div>
            ))}
            <div>
                {children}
            </div>
        </div>
    )
}