const logos = [
    { abbr: 'FP', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/HhkdL7JKqdlVy_DtjLOjbw_96x96.png' },
    { abbr: 'AD', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/Ujlge7BWmyIJvsCwu3y-Lw_96x96.png' },
    { abbr: 'SJS', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/TuRBhY0zNhgZUbHQS4VUhQ_96x96.png' },
    { abbr: 'VC', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/1SVoPsK2xW65VIfyQB2soQ_96x96.png' },
    { abbr: 'EO', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/GFR5_nXarHj6qRI8R05otg_96x96.png' },
    { abbr: 'CF', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/jwG6UfooGEJ_nvOVT_0ykw_96x96.png' },
    { abbr: 'LAK', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/74fKqDZ5DMq7qup120TeSQ_96x96.png' },
    { abbr: 'SK', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/gv_klUIk7LBmA857rbdOvw_96x96.png' },
    { abbr: 'VGK', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/QeG0x42j0YlJGYEAwowewA_96x96.png' },
    { abbr: 'CB', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/kUlSd6LbUN7Jj03mqZcgAw_96x96.png' },
    { abbr: 'AC', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/dhQ15Ly2gTPvCPbJEq-OHA_96x96.png' },
    { abbr: 'NP', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/8aNIxgSUNttfOeojBie04w_96x96.png' },
    { abbr: 'SLB', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/oUzPuWuhgzayhHwucx8htQ_96x96.png' },
    { abbr: 'CA', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/iBFLyMGpOW2Fh5j8s7kYpw_96x96.png' },
    { abbr: 'MW', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/2AkZ-bLhHUaPoj_LlLPBVA_96x96.png' },
    { abbr: 'DS', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/yAPda2I1VV6sr0TB17rnxQ_96x96.png' },
    { abbr: 'WJ', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/G92uFvMADMSGFV07IgpUIQ_96x96.png' },
    { abbr: 'CBJ', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/7lrK9CX_nZj_veEeleHTmg_96x96.png' },
    { abbr: 'PF', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/ZFZEyofJ8vMrr0tFGsMFKg_96x96.png' },
    { abbr: 'PP', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/mTXURxq0CbsVREw9q3UAnw_96x96.png' },
    { abbr: 'NYI', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/W1ILAtl-fUjegNeUaNoj8g_96x96.png' },
    { abbr: 'WC', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/uT-r__4aRFZmtEITN9mNdQ_96x96.png' },
    { abbr: 'NYR', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/xAan1UsViSOex0EoBJEMOA_96x96.png' },
    { abbr: 'NJD', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/dlm2PLEGHJY8DzDLloxLcQ_96x96.png' },
    { abbr: 'CH', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/nC8dMKdf-zPF4cWq_wSKHA_96x96.png' },
    { abbr: 'MC', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/fhexjWXZM7Sgvd22nDkBOA_96x96.png' },
    { abbr: 'OS', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/_rlImUQJkjVKGTj1Xkdaaw_96x96.png' },
    { abbr: 'DRW', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/QaP8buCif1FvjfqApkxsDg_96x96.png' },
    { abbr: 'BS', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/6vSZsDaiDt1MW__o_ksW4A_96x96.png' },
    { abbr: 'TBL', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/IFjTMxl-nMxMJK2b64xLFQ_96x96.png' },
    { abbr: 'TML', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/jMSyNOMdJPjHwsmbWukUag_96x96.png' },
    { abbr: 'BB', url: 'https://ssl.gstatic.com/onebox/media/sports/logos/_KkOxoGjAn3S7_9-Z1d0OA_96x96.png' },
]

function getLogoByAbbr(abbr) {
    return logos.map(team => {
        if (team.abbr == abbr) {
            return (
                <img className="" src={team.url} alt="" />
            )
        }
    })
}

export { getLogoByAbbr };