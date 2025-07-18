

export const fileToBase64 = (file: File): Promise<string> => { // for contact person
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const base64String = reader.result.split(',')[1]; // Extract base64 portion from Data URL
        resolve(base64String);
      } else {
        reject(new Error('Failed to read file as Data URL'));
      }
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
}

export const blobToFile = (blob: Blob, filename: string, mimeType: string): File => {
  const file = new File([blob], filename, { type: mimeType });
  return file;
}

export const base64ToBlob = (base64String: string, mimeType: string): Blob => {
  let binaryString;
  if (typeof Buffer !== 'undefined') {
    binaryString = Buffer.from(base64String, 'base64').toString('binary');
  } else {
    binaryString = atob(base64String);
  }

  const byteNumbers = new Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteNumbers[i] = binaryString.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: mimeType });
}

export const readAndConvertFileToBase642 = (file: any) => { //for document and html input type="file"
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // On successful read
    reader.onload = () => {
      // Resolve with the Base64 string
      resolve(reader.result);
    };

    // On read error
    reader.onerror = () => {
      // Reject with the error
      reject(new Error("Error reading file as Base64"));
    };

    // Start reading the file as a Data URL
    reader.readAsDataURL(file);
  });
};

export const readAndConvertFileToByteArray = (file: any) => { //for document and html input type="file"
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // On successful read
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        // Convert ArrayBuffer to Uint8Array
        const byteArray = new Uint8Array(reader.result);
        resolve(byteArray);
      } else {
        reject(new Error("FileReader result is not an ArrayBuffer"));
      }
    };

    // On read error
    reader.onerror = () => {
      reject(new Error("Error reading file as byte array"));
    };

    // Start reading the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
};


export const readAndConvertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        const base64String = (reader.result as string).split(',')[1]; // Extract Base64 part from Data URL
        resolve(base64String);
      } else {
        reject(new Error("FileReader result is null"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file as Base64"));
    };

    reader.readAsDataURL(file);
  });
};