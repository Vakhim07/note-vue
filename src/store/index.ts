import { defineStore } from 'pinia';
import axios from "axios";
import {ref} from "vue";
import router from "@/router";
export const useAdmin = defineStore('useAdmin', () => {
    const token = localStorage.getItem('token');
    const message = ref(false)
    async function login(username: string, password: string){
        localStorage.removeItem('token')
        let data = JSON.stringify({
            "username": username,
            "password": password
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://qgffq1pg-1921.asse.devtunnels.ms/api/auth/Login',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxOkErqmE75QwR-vxqXl9m6IheeIyn5-zPYX0AnRlYtHG0piBwgo1sRBkl8paO44BlochwXnnXAK8DlibOWKuuPQazeHRQ-1HbI1k6cOuxuuziR-cmsLeC3gNimAR8k-xNc2jU8K2Hzb6J9XfqXG1OP9-Da1AmMhUDwfNeNG8pBkUKe_cpnOvixEjq7pu3YmD__njPF38Fnib5UUC1sDa9czkf8RhPjzgQnakThkVB1RLo-jVB1b9h88y4-m522rBxGhrhXe20e2wxdzw22i0mCA1FRurfAQ27mpPhwrEvDVnUbRiykR_UF_rFjkDt18ZrN76aaKrFMUdPa9nEUyaen3vZgNsgbSb6X2Pus9WQZ31pZjiPnUlw2ntFwNuTp5-6hVMETaHUeJS4Of1wPIbW1jUWXpaUZZvklik-GoCH7shYYBX5znOuvBXAlUbkwvYBi0-zbbiFQmdJHgPl_Lp5gvZ5vqw_uGGUNESIODznvtOHT0sdZOUc3UpjHESGK_ulyyEFV8tzmtRVt8xT83F7u3CPFie0QL6NwgDqBfvENEsizZHzNrXNHw1Nzo_f2Qi7ufwrdXCYy7uA2GmxpaDGF46hxfOvyVjNrCaqgIs1XSjzqAf1qVZlsoGuorZL5s2PN7fpESTNozQJns3S5Gy-UYR35_ENy5ihwqavoul5ww2q391w1AJF4kkUd4BI5ebbPPE8aIA65-oqR4HMM_l0KzSBH-yAGjLGguzPQiOV4oOQSDtqO0kpSSDsUR80fqhyv29o6qid_tZFvu_CBGtaRFA5QPL6nrUah3WIiWZW1aQj7fPDfxTNMx7cIJGWPeyXC6hUp-qkk-C-0g4MNYLuncMqr47Y021JK9kEE6DAysv5Fk-gAb3R0VVZRMecLsdMqT5ic3Sl2lgkQ8V6XQg4j5'
            },
            data : data
        };

        await axios.request(config)
            .then((response) => {
                localStorage.setItem('token', response.data.result.authorization.token)
                message.value = response.data.success;
                router.push('/')
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function register(username: string, password: string, email: string){
        let data = JSON.stringify({
            "username": username,
            "password": password,
            "email": email
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://qgffq1pg-1921.asse.devtunnels.ms/api/Auth/Register',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxMHr0QLJ_YhvaNhHe1gMe9i7OrjkdnJdPvU3FIWYDV_GMcDda6lNlD6pMLDKwQD6_KtEW3ywAJgWQCoA2ItzNiVP2oiAhZTyPOs0F1I3z3bsiLAI0X9I5BVDYmMr1C1TJjT1WyCb8nzu86h65_b0hDgdVH60XXSr7iH6nFV0U7cJJ-TD_3M7z_3BtEaJmiDSs04jKy5HVPcA0I-s-4NK3Y2BnyJUjFrYAOEyWKyc38Rk3Ib0jTlgCZtZCDmZagVWYeaq5nYob_hpwJsplLSPCi2ZymGA5j7wyRCEUA6ewOGeQ7gf3FE88D4RJmAos-ZyY7AcRERtMJf89nPivf67Cv5yFTVhX-dR8wfUi-u8gDMhShgh9TN0vHD4ixKVtaZTG1UXLBkxxct3PwtdV3ncxnJ3mlxAWVceIYkj7ZD2ZIGRfmx2CMddebV8MruCr3acrTXCGYIwerEjLqsB4E-ju6121YdK-snnjKLQjfXzIrmC55ha34oUSf1BGlDWg3J2_YbE61jyRQoBeB6PZk-1qJaxBeON-582vogMmP7DiC4YqRvemW8PSmYvqqQzfMnpSzgadpZ9i-KZG3kTkL9S4XDVGDs7thIPNbYXrQFsAh-7PmiHHlMVH396u6eMN-daQeJ1-l-XSdZFmI1GyVLNJ2xOppdA9kySR-Gzts6yfkBcwHZD99EVTkFP49e4D4kUuJYoWcEtsCi535wq-qbj6BZRh_ACXwjPM1KhQktxQwsUd2sBiOITr_OtnWUx1YGoy7-9t7dUqudcjRBjESj8NqqJ5jxJuBU0Qg9VlK4fcEDNb4tvhIltJZBesSgqOTkjvyTbExdLPzn35Rahi_WWBdKpunElvzeyDnyYuUrDqpP5f_4127OkzADFkeC-djU3XBKfU2ChmbVRTzyM9k5mjlK16nrI9EdxEWxiamYNPLaLg'
            },
            data : data
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                message.value = response.data.success;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const listNotes = ref();
    async function getListNote(){
        const token = localStorage.getItem('token')
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://qgffq1pg-1921.asse.devtunnels.ms/api/Notes/GetAll',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxNOGxlM85YNgP19Aa67QYJO5u6yOcQ6aTgFJ_-EwIjjbUeR6Tc3_TH1uXb-3view9imn3BSELWEA-9uk-rtUs1l9gBYc7UIQqn2vOZttdIq_2hFg75uIk6yT_eGyXknhOCKqmuJAhzBjztPdzS36vNcUOOcXsGmOsaOrpidGZpBPdCIEsOa77946BaOhSsFytpHqrUhmLbnOxj1jF3vzgTBpjLVKc6NLV9TL84Kq7aOiUl1jgYDp-l2hdnl6LNe9rO_Mk4KOOi_yhg0ikoRDbnck93oPlzT9sQuYkRUWeQca_E2OclunVd_DUPSR735tM1iGcLcsDigwy4TY_UQMQh6LqEbbFL0PUSU7aTnBxlG_KCwv-Up1lql19Mmb5Jer5_GRWBoHg1ii3AM3NATfWUhZZ9rfIK5OkT2XQLWAo6c07149lbiZWFtIHH0oFrN1BtLfVzpDoX4NZbQkb7psbTktHhSLYutKiKliZcA9Ms8Gk1y6nnEyg2HT_M6VQ07AIripTAp_8jM3_panaYJRGoTV24zt7NP64DlNFQRG4dwrP0koUMXqasHPBNzTS9Xx1lmArHjCkA8n94h1lXJXbU39KN4z0QTQyerPiub9OmboqyCvDrjGlvUFI-XcWhXRW9CXC6_QPT9BQr_l-jDy0z7Us_SNbOupGp5TrQjEFdgIvZUG4cjjemsXNlXDST0GH5gurCb1bmK6fNZ49L5VSlySYcL6krrVpTxxPHfcSe4FhDC5iQShuaWaE_3HFh-4nrI6K2iZvItJDyiII0U7kia4WnpY0-S59WfJ5FWF271VzBRnTz_f2dlzBz9a5YTLTnfyZCSR2jDnD1Uc_CCw7t4SuxBpKsYL5U-oeTJwm7e2Mu6Lkv9YtDHDC46ZdcdE-AXG-TapKz05gnOuUfTGW_I'
            }
        };

        await axios.request(config)
            .then((response) => {
                listNotes.value = response.data.result;
            })
            .catch((error) => {
                console.log(error);
            });

    }
    async function store(title: string, content: string){
        const token = localStorage.getItem('token')
        let data = JSON.stringify({
            "title": title,
            "content": content
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://qgffq1pg-1921.asse.devtunnels.ms/api/Notes/Create',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxNI9dQmWjaT9zrmq44pwjSua21pud9Yj35fSMPmWw-aK6zYZsKdhK_mwj1lkTwtGRTkh8OixFFKZRux8R_0XfcAJfKA3jQXEfw_eOkxteR5k74xAq2GlUCHzKg45ku862W3uaL72v0D5xjPwBqoP0JTvKt8HoUARvBE6ddmKl-jYIS4NLqThiZwigd4511m7cIKLoCfXpdL5nzhoXgtRkiF8F0VV3eBp0vh0oAndi-jD4HSfXmVMdiVAZSVixS1DkCPTIs5UbMzVb4IwC6_ibFOk0WWyeZMMdjLQ9b-xxftgSt0L1-doxhz0U1Kwpa-KHJ8bE7NEsMvIqaCUDSqZv-EugCByVoiaM_ErCYZtkq3k4nsk4Oh7UjONI9leG8tYRgepB_QCBITOKSjtBa9-D_3Rni6T0pALGiT-o3qse-QE36-IZ_H83X_21QM_XaSpzQTh8UGu92VT8Z1VwR5HUZwG0-gieoPyRTy_q8j_cLCbcVaHciwVA49NFRjIr1jZvydDpOtTDWemTid7OL9Gh8Q9qpZosfzbbm6kWAeCKsT9FL7GsUnJEygd0v-FhdTl79lfKTf37Y2G8Mgw62YFyIUwbj61_rUfEVi6GC2GpvWLJSBsU5cVUUuu4Qm2CuOqYTcRaQh5fbyC-0aBYWJ9OOwWpzTYmorXddu5LwqKupmoJhFiDsIR9oGBk2It8YWZ6ykeeXbx2ey0jvoU9Vks8UMSjcPu6ndzwlBzN9Q238tQYStLq91i3YNk95rdfrv3J1WgtNx0dSg6_SKYcONz1vnm376aKAe0wohqZW8bFc84YNCdBDvpSYQVRn4w6dO5O0vcYsEUBV1mjuMCDwbkRrwHL0Iu5PNdpa4C_VEzGPGf7R8gN_bNrOlMK_CN7lltUkU9BJXmgTamYb5ITPYp_pk'
            },
            data : data
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                message.value = response.data.success;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const listNoteByID = ref();
    async function getListNoteByID(id: any){

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://qgffq1pg-1921.asse.devtunnels.ms/api/Notes/Get?id=${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxMPcXZKYAgXteYRk1o9jNvaW0xDKOwKMisogD4pPfnCF9VZcwCJh-hvi6QwX4rtuVXuvy0XvvAC5J4DBwlOqtIfrZdF1UZh2jnUJdrpXgIVe4ILjUodfjiYQlNJKOnvC_xXmE6THogFp27_08shTCLnQ7lr9GHNmXN4o1VMGIFVDRUJGu2_J5iMYGmFmHfg3VQMwzrByFrX34w0_PkHR63NYNLguw8-tnQP1z6vsT2YLjyotaBPPVsrBbYOSdwA5q7hj_VtM5ifXkOX3R3E7RroGpVRyzc6pTn3nXJyQ6miT9V70soH6QKK44ur6HdyRMsSjDWohg-pv-V-n5J8BCEhXwJmZ1P90DKPkp0bX76-pF9fgSJ44o0l_e9ffEBiYl6uKhcGHn-VeL_Oie8nYxPdrbZPIc75SAke8xrBpDzmJghJzl3unh0NAMkPrSXbo3BTvimFTTjcGHROohp_dse9CDjCOTCGy0x5kCyHs0dDVgF0MbA_D3H1TPssbB3swPmbJ23gvfc1F68X6NvBVI26dC5YxUOCYCssJGNOfOzbgVPOczhuc4C9wx2zQ6SKEWhepp2yWGnIc9rfL1NTPBEjxiHBQYp_Dldw2nW6s_5h-xCR7ft5HkoDJ9vwich9NBz4LipCgkl7FaPyKaBitzVlA_7pO_OXbOQUN600T3Rw-1K8QSKyrJqe714YkzKj5_r6pb10AbGAzfrw4ow6vEiE8hKjJFUOiqVDekJaeD5xr9SULg-87VR77TMal6p5qEpDYntMkGwgEmZwvoolT869OghcFuuN_Wsnuw8HtReJAlVpvLPOaWuPwcEz-KRhKHkVK7wmoC2HbiRSHC1oPoMTek08Q9pvkVWH4K1-Y4v9apB5qRug9UPbUhERiQo9CRdBvIwOc-514G_E2t9Zj8s1da8YrQZJcYFq7JXbt5glOA'
            },
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                listNoteByID.value = response.data.result;
            })
            .catch((error) => {
                console.log(error);
            });

    }
    async function updateNote(id: any,title: string, content: string){
        let data = JSON.stringify({
            "id": id,
            "title": title,
            "content": content
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://qgffq1pg-1921.asse.devtunnels.ms/api/Notes/Update',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxPrF4La_Op4Byob5nGYUBvNqgZ1e1P7XFPn4GJlbtmxClGkv661thrBgxRwV_zPZlqiepPa1bvRWyJ4HU4tIM_US61qnQ42HTY8epCjRIr-TKU1TlOCOeWqZADcQlLNr2XJC8Kl9srHrwUhC-7eTP3Wh85YrvTLoOwbyE-qmftwnv6vLHS6au7ytr9spafgkmRuxRQYSYGLMqV7Hjod63Ew48Bh8OlM9yWl67kqMzc_twD34t3ZSq6P4WzO36eDyKJWt-dSnLgLwHdPAUDBqcKC6161YouS8VFfe1E2WyoNTPcwUSWpP-Iz10_4kRrk9l-flJou8GwJo627FoDCqo1SqaWZPJ1U0dqzrA38oDqHQEnv-FDbQFV_YOKEHyb7crRq8PF0UMRm_ygIhl5ZC2DQ69s0Qh17GF3o2UmojsO_m4sTnnleGbHECiv4Nmg6Xr8jMV9ZZhz-aVhw4fdPRv3plwM1PfCibxWacYtDzlqkCBnMuxVxiCligjRUZiArpMuBLJqyo_wVBKTAlQi-5AHPHzEKsfoMeFH5yPgZh-lt-aeMqLRibXCYMl5RLQW801s9XFANAH4ygcn4IyQVrDu27PwfdYX1FNTX0LlMlTpS_jrOX6wrtEbWgh-Vf1d4xCp7-wlKHBwIMcpaTAOSulYIZEzdwqskCHrPwuv_qk3GXiv3RnTz3XOKIo03vjPzO9bL6bpwRCymf57k2h47sSQ7nQ-18Xe2X1Hr5pNkMTbMC_mTqypEFrlr_iEB_6yJhwOb79Bm_V9QfNGbHpOcYhu2hhFSbGKFfM0OchSHkibbREuDOUXHsygEC_XNNNnrS2V-Eisqru8CbbTohEEAw1C_2aBj79PHImnswFPAtaBbB8OUD-gcKDD1Lzvu3pWskzYPZU31H54Weqe-EFSZ7cOsx6xc4TNU46AGB8uNaEuthA'
            },
            data : data
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                message.value = response.data.success;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async function deleteNote(id: number){

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://qgffq1pg-1921.asse.devtunnels.ms/api/Notes/Delete?id=${id}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cookie': '.Tunnels.Relay.WebForwarding.Cookies=CfDJ8E0FHi1JCVNKrny-ARCYWxPsHhghfHEQ-yv1XjXbB2wHxK-cyRuE2v4gqBgfLAZbJPrwx7u8ZbhsoG3ddUqag1DtqoAUEuYEqjo2aJnXU1OhoLWYZ6Qjpld1zX3o2bJreTrGRS0C3QuQHy4xJP1Oh9MTQk7uoDOMhiVzQ2ZUBYqygonIp1vo81tcrN-RkgHiMgICeAV05nGw1a1FLgNqqlX1mIcQzsymgrRcDReez5s2zNDEfGlBfxSovsXHv92LecbMl3qRHlCfWsTm1Jfz8FOoNgbv15LJ3XTxYSosywwg52lX0unJu69nU3PY1q4mfB4qPBvaoOsr27V6vwIaZYbn0Q6TSaEPALAIMT91SPaOlJVhgP5OVm8PNNXehqMlAZ59gqRIsfNwDoybWb0X0SFnUCNnSos59DJxE-gbemlWn2qgNGSL3Nv2I8trCIql0b_cLbRk4gKqtyvvSF_ibyMxqkx-JuXNXCh5gQelaTHAiM9oy3v5Drro119SKOX5qRD_zNlZ71124YRLxwpg0dcGXXVhQQEp8XXXj8ux084Cy9jB5yhEAs6oczXf7gd91rQSoER0X9ZtGs6jOffrw2x48qGYQpjyNVzk4-XqwQOvxZbEfBLLUXf6AIn3GfG7_LLff6hja9NM__zAwGuUoL5MT3wvvigoJZcBP4o7VcJXUJ3YkShL8Ikism9-AQMdbjdSM4RdQHU5euLaAt16V7huBJrhmVXw_GLV8Fb68lt3a9nT7BEBCqy_o5MSg1f00J8eTCBboovOVicja14i06qQuB99G6OmI6ULD4W1-2IiVIaKgFL09lgeBSaQRRVM30fNSMGHn_-fTqYT4Fi4oGU0MSbqMiUu-h1LX1EOGUrVOrmDHsDlQmDxXCfN2W8nYQLjM-BW4SUk4LdSf1mIPz6njB662atu17JWF6dHt1LrIotwF9kv9R4jkOn2ZY3WBg'
            }
        };

        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                message.value = response.data.success;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return {
        login,
        getListNote,
        listNotes,
        store,
        listNoteByID,
        getListNoteByID,
        updateNote,
        message,
        deleteNote,
        register
    }
});
