import { ipcRenderer } from 'electron';

const DLNA: IDLNA = {
	browser: null,
	start: () => {
		ipcRenderer.send('dlna-request');
		return new Promise(resolve => {
			ipcRenderer.once('dlna-reply', function (event: any, devices: IDevice[]) {
				resolve(devices);
			});
		});
	},
	play: (device: IDevice, url: string) => ipcRenderer.send('dlna-play', device.host, url),
	stop: () => ipcRenderer.send('dlna-destory')
};

interface IDLNA {
	browser: any;
	start: () => Promise<IDevice[]>;
	stop: () => void;
	play: (device: IDevice, url: string) => void;
}

export default DLNA;