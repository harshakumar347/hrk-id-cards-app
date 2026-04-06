import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';  

@Component({
  selector: 'app-qr-code-generator',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './qr-code-generator.component.html',
  styleUrl: './qr-code-generator.component.css'
})
export class QrCodeGeneratorComponent {

}
